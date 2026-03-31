def format_disease_name(raw_name: str) -> str:
    """Format underscored labels (e.g. cherry_powdery_mildew) to human readable names."""
    return raw_name.replace("_", " ").title()
