import { selectedCourseId } from "../Stores/stores";

export interface CourseRequest {
    name: string;
    instructor: string;
    capacity: number;
}

export interface CourseDetails {
    id: number;
    name: string;
    instructor: string;
    capacity: number;
    signups: number;
    users: { id: number; name: string; email: string; signUpDate: string; }[];
}

export async function getCourses(): Promise<CourseDetails[]> {
    try {
        const response = await fetch(import.meta.env.VITE_HOST_REM+`/api/courses`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to get courses:", await response.text());
            return [];
        }
    } catch (error) {
        console.error("Error in getting courses:", error);
        return [];
    }
}

export async function getUserCourses(): Promise<number[]> {
    try {
        const response = await fetch(import.meta.env.VITE_HOST_REM+`/api/user/courses`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to get user courses:", await response.text());
            return [];
        }
    } catch (error) {
        console.error("Error in getting user courses:", error);
        return [];
    }
}

export async function addCourse(courseId: number, userId: string): Promise<boolean> {
    try {
        const response = await fetch(import.meta.env.VITE_HOST_REM+`/api/courses/${courseId}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            },
            body: JSON.stringify({ userId: userId })
        });

        return response.ok;
    } catch (error) {
        console.error(`Error in adding course with ID ${courseId}:`, error);
        return false;
    }
}

export async function createCourse(courseRequest: CourseRequest): Promise<boolean> {
    try {
        const response = await fetch(import.meta.env.VITE_HOST_REM+`/api/courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            },
            body: JSON.stringify(courseRequest)
        });

        if (response.ok) {
            return true;
        } else {
            console.error("Failed to create course:", await response.text());
            return false;
        }
    } catch (error) {
        console.error("Error in creating course:", error);
        return false;
    }
}

export async function removeUserFromCourse(courseId: string, userId: string): Promise<boolean> {
    try {
        const response = await fetch(import.meta.env.VITE_HOST_REM+`/api/courses/${courseId}/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            }
        });

        return response.ok;
    } catch (error) {
        console.error(`Error in removing user with ID ${userId} from course with ID ${courseId}:`, error);
        return false;
    }
}

export async function getCourseDetails(courseId: string): Promise<CourseDetails | null> {
    try {
        const response = await fetch(import.meta.env.VITE_HOST_REM+`/api/courses/${courseId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to get course details:", await response.text());
            return null;
        }
    } catch (error) {
        console.error(`Error in getting details for course with ID ${courseId}:`, error);
        return null;
    }
}

export async function updateCourse(courseId: number, course: CourseDetails): Promise<boolean> {
    try {
        const response = await fetch(import.meta.env.VITE_HOST_REM+`/api/courses/${courseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            },
            body: JSON.stringify(course)
        });

        return response.ok;
    } catch (error) {
        console.error(`Error in updating course with ID ${courseId}:`, error);
        return false;
    }
}



export async function deleteCourseById(courseId: string): Promise<boolean> {
    try {
        const response = await fetch(import.meta.env.VITE_HOST_REM+`/api/courses/${courseId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            }
        });

        return response.ok;
    } catch (error) {
        console.error(`Error in deleting course with ID ${courseId}:`, error);
        return false;
    }
}
