import pandas as pd
import numpy as np
import math
from app.services.file_service import data_storage

def calculate_sample_size(population_size, confidence_level_str, margin_of_error=0.05):
    """Calculates sample size using the formula for simple random sampling, with finite population correction."""
    confidence_level_map = {
        '90': 1.645,
        '95': 1.96,
        '99': 2.576
    }
    z_score = confidence_level_map.get(confidence_level_str, 1.96) # Default to 95%
    p = 0.5 # Most conservative proportion

    # Formula for infinite population
    n_infinite = (z_score**2 * p * (1 - p)) / margin_of_error**2

    # Finite population correction
    n_adjusted = n_infinite / (1 + (n_infinite - 1) / population_size)

    return math.ceil(n_adjusted)

def perform_sampling(params):
    """Performs sampling based on the provided parameters."""
    df = data_storage.get('latest_df')
    if df is None:
        return {"error": "No data file has been uploaded yet."}

    population_size = len(df)
    sample_size = 0

    # Determine sample size
    if params.sizeMode == 'manual':
        sample_size = params.manualSize
    else: # auto
        sample_size = calculate_sample_size(population_size, params.confidenceLevel, params.marginOfError)
    
    if sample_size > population_size:
        return {"error": f"Sample size ({sample_size}) cannot be larger than the population size ({population_size})."}

    # Perform sampling based on type
    sample_df = None
    if params.samplingType == 'simple':
        sample_df = df.sample(n=sample_size)
    
    elif params.samplingType == 'stratified':
        strata_col = params.stratifyColumn
        if not strata_col or strata_col not in df.columns:
            return {"error": "A valid stratification column must be selected."}
        
        # Proportional allocation
        sample_df = df.groupby(strata_col, group_keys=False).apply(
            lambda x: x.sample(n=max(1, math.ceil(len(x) / population_size * sample_size)))
        )
        # Adjust final sample size if rounding caused minor differences
        if len(sample_df) != sample_size:
            sample_df = sample_df.sample(n=sample_size)

    elif params.samplingType == 'systematic':
        k = round(population_size / sample_size)
        if k <= 0:
            return {"error": "Interval k must be positive. Try a smaller sample size."}
        start_index = np.random.randint(0, k)
        indices = np.arange(start_index, population_size, k)
        sample_df = df.iloc[indices]

    elif params.samplingType == 'cluster':
        cluster_col = params.clusterColumn
        num_clusters = params.numClusters
        if not cluster_col or cluster_col not in df.columns:
            return {"error": "A valid cluster column must be selected."}
        if not num_clusters or num_clusters <= 0:
            return {"error": "The number of clusters must be a positive number."}
        
        unique_clusters = df[cluster_col].unique()
        if num_clusters > len(unique_clusters):
            return {"error": f"Number of clusters to sample ({num_clusters}) cannot be larger than the total unique clusters available ({len(unique_clusters)})."}
        
        selected_clusters = np.random.choice(unique_clusters, size=num_clusters, replace=False)
        sample_df = df[df[cluster_col].isin(selected_clusters)]

    else:
        return {"error": f"Sampling type '{params.samplingType}' is not yet implemented."}

    return {
        "sample_data": sample_df.to_dict(orient='records'),
        "column_names": df.columns.tolist(),
        "sample_size": len(sample_df),
        "population_size": population_size
    }