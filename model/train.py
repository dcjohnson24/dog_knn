from pathlib import Path
import sys
sys.path.append('../model/')

import pandas as pd
import numpy as np
# This needs to be here despite not being used see
# https://scikit-learn.org/stable/modules/generated/sklearn.impute.IterativeImputer.html
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler


class DogKNN:
    def __init__(self, dog_breed: str, n_neighbors: int):
        self.dog_breed = dog_breed
        # Hack since the first neighbor is the point itself
        self.n_neighbors = n_neighbors + 1

    def prepare_data(self) -> pd.DataFrame:
        """ Tidy up dataset KIBBBestInShowFull.csv

        Returns:
            pd.DataFrame: A cleaned dataframe
        """
        try:
            df = pd.read_csv('KIBBestInShowFull.csv')
        except FileNotFoundError:
            path = Path.home() / 'dog_knn' / 'model' / 'KIBBestInShowFull.csv'
            df = pd.read_csv(path)
        df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
        df = df.replace('no data', np.nan)
        df = df.replace('NA (3 classes)', np.nan)
        df.columns = df.columns.str.lower()

        # Convert cost columns to numeric
        cost_cols = df.columns[df.columns.str.contains('$', regex=False)]
        df[cost_cols] = df[cost_cols].astype(str)
        df[cost_cols] = df[cost_cols].apply(lambda x: x.str.replace('$', ''))\
            .apply(lambda x: x.str.replace(',', ''))\
            .apply(pd.to_numeric, errors='coerce')
        self.df = df
        return self.df

    def select_variables(self, vars: list) -> pd.DataFrame:
        """ Subset dataframe based on variables of interest

        Args:
            vars (list): list of variables from the dataframe

        Returns:
            pd.DataFrame: a subsetted dataframe of numeric type
        """
        df = self.prepare_data()
        subset_df = df[vars]
        subset_df = subset_df.apply(pd.to_numeric)
        return subset_df

    def find_neighbors(self, subset_df: pd.DataFrame) -> np.array:
        """Return the self.n_neighbors nearest neighbors of the self.dog_breed

        Args:
            subset_df (pd.DataFrame): DataFrame containing variables
                of interest

        Returns:
            np.array: An array of the nearest neighbors of self.dog_breed
        """
        # Dropping rows with any missing values goes from 174 to 53.
        # I use a multivariate imputation
        # technique that regresses each feature on every other feature.
        # The feature chosen for y will
        # have it's missing values filled in.
        # https://scikit-learn.org/stable/modules/impute.html
        X = IterativeImputer(max_iter=10, random_state=42)\
            .fit_transform(subset_df)
        X = StandardScaler().fit_transform(X)
        nbrs = NearestNeighbors(n_neighbors=self.n_neighbors).fit(X)

        idx = self.df.index[self.df['dog breed'] == self.dog_breed]
        indices = nbrs.kneighbors(X[idx], return_distance=False).flatten()

        return indices

    def get_breed_names(self, indices: np.array) -> str:
        """ Return the original dog breed names for the indices

        Args:
            indices (np.array): indices of the n_neighbors nearest neighbors of self.dog_breed

        Returns:
            str: a list of the closest breeds to self.dog_breed
        """
        # Since the first element is the dog itself, look at indices[1:]
        dog_neighbors = self.df['dog breed'].iloc[indices[1:]].tolist()
        dog_neigh_fmt = comma_formatter(dog_neighbors)
        return f'The closest breeds to {self.dog_breed} are {dog_neigh_fmt}'


def comma_formatter(name_list: list) -> str:
    """Return a properly formatted strings from a list

    Args:
        name_list (list): list of dog names

    Returns:
        str: a string in the form of name1, name2, and name3
    """
    return ", ".join(name_list[:-2] + [", and ".join(name_list[-2:])])


def main(dog_breed: str, n_neighbors: int = 3, cost_vars: bool = False) -> str:
    """ Print the nearest neighbors of a given dog breed

    Args:
        dog_breed (str): One of the 174 dog breeds in the dataset.
        n_neighbors (int, optional): number of neighbors to choose.
            Defaults to 3.
        cost_vars (bool): Whether to use cost or physical characteristics.

    Returns:
        str: The nearest neighbors of the dog_breed and the variables used.
    """
    dog_knn = DogKNN(dog_breed=dog_breed, n_neighbors=n_neighbors)

    if cost_vars:
        var_list = ['lifetime cost, $',
                    '4a average purchase price, us$',
                    '4b food costs per year, us$',
                    'other regular costs, total per lifetime, $']
    else:
        var_list = ['3 no. of genetic ailments',
                    'weight (kg)',
                    'shoulder height (cm)']

    subset_df = dog_knn.select_variables(var_list)
    neighbors = dog_knn.find_neighbors(subset_df)
    breed_names = dog_knn.get_breed_names(neighbors)
    print(breed_names)
    var_list[0] = 'no. of genetic ailments'
    fmt_vars = comma_formatter(var_list)
    print(f'using the variables {fmt_vars}')
    return breed_names + f', using the variables {fmt_vars}'


if __name__ == '__main__':
    main(dog_breed='Manchester Terrier')
