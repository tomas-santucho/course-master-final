<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import {
        selectedCourseId,
        showCourseDetails,
        storedUserId,
        storedUsername,
    } from "../Stores/stores";
    import { addCourse, getCourses, getUserCourses } from "../service/CourseService";
    import { logout } from "../service/AuthService";

    let courses = [];
    let userEnrolledCourses = new Set();
    let sortType = 'low-signup';
    const dispatch = createEventDispatcher();

    onMount(async () => {
        await fetchCoursesAndUserCourses();
        sortCourses();
    });

    async function fetchCoursesAndUserCourses() {
        courses = await getCourses();
    }

    async function handleAddCourse(courseId) {
        try {
            await addCourse(courseId, localStorage.getItem("user-id"));
            await fetchCoursesAndUserCourses();
            sortCourses();
        } catch (error) {
            console.error(error);
        }
    }

    function handleViewCourseDetails(courseId) {
        $selectedCourseId = courseId;
        $showCourseDetails = true;
    }

    function sortCourses() {
        if (sortType === 'low-signup') {
            sortedCourses = [...courses].sort((a, b) => a.signups - b.signups);
        } else if (sortType === 'high-signup') {
            sortedCourses = [...courses].sort((a, b) => b.signups - a.signups);
        }
    }

    $: sortedCourses = [...courses];
</script>

<style>
    .course-name {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }
</style>

<div class="container mx-auto py-4">
    <h1 class="text-2xl font-bold">Welcome, {localStorage.getItem("user-name")}</h1>
    <button class="btn btn-secondary" on:click={() => logout()}>Logout</button>

    <div class="flex justify-between my-4">
        <div>
            <button class="btn btn-primary" on:click={() => dispatch('addCourse')}>Add a course</button>
        </div>
        <div>
            <a href="#" on:click={() => { sortType = 'low-signup'; sortCourses(); }} class="link mx-2">Low Sign Up</a>
            <a href="#" on:click={() => { sortType = 'high-signup'; sortCourses(); }} class="link mx-2">High Sign Up</a>
        </div>
    </div>

    <table class="table table-auto w-full">
        <thead>
        <tr>
            <th>Course</th>
            <th>Instructor</th>
            <th>Signups</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {#each sortedCourses as course}
            <tr>
                <td class="course-name" on:click={() => handleViewCourseDetails(course.id)}>{course.name}</td>
                <td>{course.instructor}</td>
                <td>{course.signups}/{course.capacity}</td>
                <td>
                    {#if course.signups >= course.capacity}
                        Full
                    {:else if course.isUserInCourse}
                        Already Added
                    {:else}
                        <button class="btn btn-link" on:click={(event) => { event.stopPropagation(); handleAddCourse(course.id); }}>Add</button>
                    {/if}
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
