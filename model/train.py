import pandas as pd
import numpy as np

from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
from sklearn.neighbors import NearestNeighbors

def prepare_data(file: str) -> pd.DataFrame:
    """ Tidy up dataset

    Args:
        file (str): name of file data file e.g. KIBBestInShowFull.csv

    Returns:
        pd.DataFrame: A cleaned dataframe
    """
    df = pd.read_csv('KIBBestInShowFull.csv')
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    df = df.replace('no data', np.nan)
    df = df.replace('NA (3 classes)', np.nan)
    df.columns = df.columns.str.lower()
    return df

def select_variables(df: pd.DataFrame, vars: list) -> pd.DataFrame:
    subset_df = df[vars]
    subset_df = subset_df.apply(pd.to_numeric)
    return subset_df
    

def find_neighbors(df: pd.DataFrame, dog_breed_idx:int, n_neighbors: int) -> str:
    X = IterativeImputer(max_iter=10, random_state=42).fit_transform(df)
    nbrs = NearestNeighbors(n_neighbors=n_neighbors).fit(X)
    
    indices = nbrs.kneighbors(X[dog_breed_idx], return_distance=False).flatten()
    # Since the first element is the dog itself, look at indices[1:]
    return indices

def comma_formatter(name_list: list):
    return ", ".join(name_list[:-2] + [" and ".join(name_list[-2:])])

def get_breed_names(df, dog_breed:str, indices: np.array):
    dog_neighbors = df['dog breed'].iloc[indices[1:]].tolist()
    dog_neigh_fmt = comma_formatter(dog_neighbors)
    # dog_neigh_fmt = ', '.join(dog_neighbors[:-2]) + ' and '.join(dog_neighbors[-2:])
    return f'The closest breeds to {dog_breed} are {dog_neigh_fmt}'

    

def main(dog_breed: str, vars:list=None, n_neighbors: int=3):
    cost_vars = ['food per week, $']
    if vars is None:
        vars = ['3 no. of genetic ailments', 'weight (kg)', 'shoulder height (cm)']
    df = prepare_data('KIBBestInShowFull.csv')
    X = select_variables(df, vars=vars)
    idx = df.index[df['dog breed'] == dog_breed]
    knn = find_neighbors(X, dog_breed_idx=idx, n_neighbors=3)
    names = get_breed_names(df, dog_breed=dog_breed, indices=knn)
    fmt_vars = comma_formatter(vars)
    print(names)
    print(f"using the variables {fmt_vars}")

if __name__ == '__main__':
    main(dog_breed='Manchester Terrier')
    # df = pd.read_csv('KIBBestInShowFull.csv')
    # df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    # # Start with physical characteristics e.g. height, weight, etc.
    # df.columns = df.columns.str.lower()
    # physical_vars = ['3 no. of genetic ailments', 'weight (kg)', 'shoulder height (cm)', 'food per week, $']
    # physical_df = df[physical_vars]
    # physical_df = physical_df.replace('no data', np.nan)
    # physical_df = physical_df.replace('NA (3 classes)', np.nan)
    # physical_df = physical_df.apply(pd.to_numeric)

    # # Dropping rows with any missing values goes from 174 to 53. Will use a multivariate imputation
    # # technique that regresses each feature on every other feature. The feature chosen for y will 
    # # have it's missing values filled in. https://scikit-learn.org/stable/modules/impute.html
    # X = IterativeImputer(max_iter=10, random_state=42).fit_transform(physical_df)

    # nbrs = NearestNeighbors(n_neighbors=3).fit(X)
    # dog = 'Manchester Terrier'
    # idx = df.index[df['dog breed'] == dog]

    # indices = nbrs.kneighbors(X[idx], return_distance=False).flatten()
    # # Since the first element is the dog itself, look at indices[1:]
    # dog_neighbors = df['dog breed'].iloc[indices[1:]].tolist()
    # dog_neigh_fmt = ', '.join(dog_neighbors[:-2]) + ' and '.join(dog_neighbors[-2:])
    # print(f'The nearest neighbors to {dog} are {dog_neigh_fmt}')
    # cost_vars = []
    # # TODO do a separate version for cost variables