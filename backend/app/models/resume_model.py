from datetime import datetime
from config.db import db
from bson import ObjectId


class ResumeModel:

    @staticmethod
    def create(data):
        collection = db["resumes"]

        result = collection.insert_one({
            "userId": data["userId"],
            "fileName": data["fileName"],
            "filePath": data["filePath"],
            "parsedText": data["parsedText"],
            "analysis": data["analysis"],
            "jdAnalyses": [], 
            "createdAt": datetime.utcnow()
        })

        return str(result.inserted_id)

    # GET BY ID
    @staticmethod
    def get_by_id(resume_id):
        collection = db["resumes"]

        resume = collection.find_one({"_id": ObjectId(resume_id)})

        if not resume:
            return None

        resume["_id"] = str(resume["_id"])
        resume["userId"] = str(resume["userId"])

        return resume

    # GET ALL BY USER
    @staticmethod
    def get_by_user(user_id):
        collection = db["resumes"]

        resumes = list(collection.find({"userId": user_id}))

        for r in resumes:
            r["_id"] = str(r["_id"])
            r["userId"] = str(r["userId"])

        return resumes

    # ADD JD ANALYSIS
    @staticmethod
    def add_jd_analysis(resume_id, jd_data):
        collection = db["resumes"]

        collection.update_one(
            {"_id": ObjectId(resume_id)},
            {
                "$push": {
                    "jdAnalyses": jd_data
                }
            }
        )

        updated = collection.find_one({"_id": ObjectId(resume_id)})

        if not updated:
            return None

        updated["_id"] = str(updated["_id"])
        updated["userId"] = str(updated["userId"])

        return updated
    
    # ADD GENERATED RESUME
    @staticmethod
    def add_generated_resume(resume_id, generated_data):
        collection = db["resumes"]

        collection.update_one(
            {"_id": ObjectId(resume_id)},
            {
                "$push": {
                    "generatedResumes": generated_data
                }
            }
        )

        updated = collection.find_one({"_id": ObjectId(resume_id)})

        updated["_id"] = str(updated["_id"])
        updated["userId"] = str(updated["userId"])

        return updated