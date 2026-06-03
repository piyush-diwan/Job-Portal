import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        console.log(req.body);

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error); // Ye terminal me actual error print karega
        // YAHAN RESPONSE RETURN KARNA ZAROORI HAI:
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        console.log(req.body)
        const userId = req.id;
        console.log(req.body);

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        const job = await Job.findByIdAndUpdate(req.params.id, {
            title,
            description,
            requirements,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        }, { new: true });

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error); // Ye terminal me actual error print karega
        // YAHAN RESPONSE RETURN KARNA ZAROORI HAI:
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    console.log("getJobById called with id:", req.params.id); // Debugging log
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate([
            { path: "applications" },
            { path: "company" }
        ]);

        console.log("Job found:", job);
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// controller/savedJob.controller.js
export const saveJobForLater = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id; // Yahan dhyan dena, destructuring mat use karna

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        if (!user.profile.savedJobs) {
            user.profile.savedJobs = [];
        }

        // Safety Check: Check karega ki kya job array me exist karti hai (nulls ko ignore karke)
        const isAlreadySaved = user.profile.savedJobs.some(id => id && id.toString() === jobId);

        let message = "";
        let isSavedStatus = false;

        if (isAlreadySaved) {
            // Remove job
            user.profile.savedJobs = user.profile.savedJobs.filter(id => id && id.toString() !== jobId);
            message = "Job removed from saved list";
            isSavedStatus = false;
        } else {
            // Add job
            user.profile.savedJobs.push(jobId);
            message = "Job saved successfully.";
            isSavedStatus = true;
        }

        await user.save();

        // Frontend ko updated array aur status bhej do
        return res.status(200).json({
            message,
            success: true,
            savedJobs: user.profile.savedJobs,
            isSaved: isSavedStatus
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({
            path: "profile.savedJobs",
            populate: {
                path: "company"
            }
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }

        // FIX: Filter out any null values that were saved previously by mistake
        const validSavedJobs = user.profile.savedJobs.filter(job => job !== null);

        return res.status(200).json({
            savedJobs: user.profile.savedJobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};