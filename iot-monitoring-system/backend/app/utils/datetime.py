from datetime import datetime, timezone 

def utc_now():
    """UTC time without microseconds"""
    return datetime.now(timezone.utc).replace(microsecond=0)