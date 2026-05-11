from datetime import datetime, timedelta


class TempStore:
    _store = {}

    EXPIRY_MINUTES = 30

    @classmethod
    def save(cls, temp_id, data):
        cls._store[temp_id] = {
            "data": data,
            "createdAt": datetime.utcnow()
        }

    @classmethod
    def get(cls, temp_id):
        item = cls._store.get(temp_id)

        if not item:
            return None

        # check expiry
        if datetime.utcnow() - item["createdAt"] > timedelta(minutes=cls.EXPIRY_MINUTES):
            del cls._store[temp_id]
            return None

        return item["data"]

    @classmethod
    def delete(cls, temp_id):
        if temp_id in cls._store:
            del cls._store[temp_id]