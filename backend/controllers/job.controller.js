import { Job } from "../models/job.model.js";

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
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
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
        const userId = req.id; // From your auth middleware
        const { jobId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        // Check if job is already saved
        const isAlreadySaved = user.profile.savedJobs.includes(jobId);

        if (isAlreadySaved) {
            // Option: If clicked again, remove it (Toggle functionality)
            user.profile.savedJobs = user.profile.savedJobs.filter(id => id.toString() !== jobId);
            await user.save();
            return res.status(200).json({ message: "Job removed from saved list", success: true });
        }

        // Add to savedJobs array
        user.profile.savedJobs.push(jobId);
        await user.save();

        return res.status(200).json({
            message: "Job saved successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};