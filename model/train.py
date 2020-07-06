import pandas as pd
import numpy as np

from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
from sklearn.neighbors import NearestNeighbors

class DogKNN:
    def __init__(self, dog_breed: str, n_neighbors: int):
        self.dog_breed = dog_breed
        self.n_neighbors = n_neighbors

    def prepare_data(self, filename: str) -> pd.DataFrame:
        """ Tidy up dataset

        Args:
            filename (str): name of file data file e.g. KIBBestInShowFull.csv

        Returns:
            pd.DataFrame: A cleaned dataframe
        """
        df = pd.read_csv(filename)
        df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
        df = df.replace('no data', np.nan)
        df = df.replace('NA (3 classes)', np.nan)
        df.columns = df.columns.str.lower()
        self.df = df
        return self.df

    def select_variables(self, vars: list) -> pd.DataFrame:
        """ Subset dataframe based on variables of interest

        Args:
            vars (list): list of variables from the dataframe

        Returns:
            pd.DataFrame: a subsetted dataframe of numeric type
        """
        subset_df = self.df[vars]
        subset_df = subset_df.apply(pd.to_numeric)
        return subset_df
        
    def find_neighbors(self, subset_df: pd.DataFrame) -> np.array:
        """Return the self.n_neighbors nearest neighbors of the self.dog_breed

        Args:
            subset_df (pd.DataFrame): DataFrame containing variables of interest

        Returns:
            np.array: An array of the nearest neighbors of self.dog_breed 
        """
        # Dropping rows with any missing values goes from 174 to 53. I use a multivariate imputation
        # technique that regresses each feature on every other feature. The feature chosen for y will 
        # have it's missing values filled in. https://scikit-learn.org/stable/modules/impute.html
        X = IterativeImputer(max_iter=10, random_state=42).fit_transform(subset_df)
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
    """Return a properly formatted string list

    Args:
        name_list (list): list of dog names

    Returns:
        str: a string in the form of name1, name2, and name3
    """
    return ", ".join(name_list[:-2] + [" and ".join(name_list[-2:])])
    

def main(dog_breed: str, n_neighbors: int=3) -> None:
    """ Print the nearest neighbors of a given dog breed

    Args:
        dog_breed (str): One of the 174 dog breeds in the dataset
        n_neighbors (int, optional): number of neighbors to choose. Defaults to 3.
    """
    dog_knn = DogKNN(dog_breed=dog_breed, n_neighbors=n_neighbors)
    df = dog_knn.prepare_data('KIBBestInShowFull.csv')
    phys_vars = ['3 no. of genetic ailments', 'weight (kg)', 'shoulder height (cm)']
    # cost_vars = ['lifetime cost, $', 
    #                 '4a average purchase price, us$', 
    #                 '4b food costs per year, us$',
    #                 'other regular costs, total per lifetime, $']
    # for var_list in [phys_vars, cost_vars]:
    subset_df = dog_knn.select_variables(phys_vars)
    neighbors = dog_knn.find_neighbors(subset_df)
    breed_names = dog_knn.get_breed_names(neighbors)
    print(breed_names)
    fmt_vars = comma_formatter(phys_vars)
    print(f"using the variables {fmt_vars}")

    
if __name__ == '__main__':
    main(dog_breed='Manchester Terrier')
    