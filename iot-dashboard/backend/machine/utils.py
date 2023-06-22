"""
Utilidades del app `Machine´

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""

from datetime import datetime, timedelta


def get_start_date(date_end, interval):
    """
    Función que retorna la fecha de inicio dependiendo el intervalo
    """
    if interval == '1y':
        return date_end - timedelta(weeks=53)
    elif interval == '6m':
        return date_end - timedelta(weeks=26)
    elif interval == '1m':
        return date_end - timedelta(weeks=4)
    elif interval == '15d':
        return date_end - timedelta(days=15)
    elif interval == '7d':
        return date_end - timedelta(weeks=1)
    elif interval == '24h':
        return date_end - timedelta(days=1)
    elif interval == '8h':
        return date_end - timedelta(hours=8)
    elif interval == '1h':
        return date_end - timedelta(hours=1)
    elif interval == '5m':
        return date_end - timedelta(minutes=5)
    else:
        return date_end - timedelta(minutes=5)

def get_interval(interval):
    if interval == '1y':
        return '8h'
    elif interval == '6m':
        return '4h'
    elif interval == '1m':
        return '1h'
    elif interval == '15d':
        return '30 min'
    elif interval == '7d':
        return '15 min'
    elif interval == '24h':
        return '5 min'
    elif interval == '8h':
        return '1 min'
    elif interval == '1h' or interval == '5m':
        return None
    else:
        return None