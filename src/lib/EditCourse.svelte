<script lang="ts">
    import { onMount } from 'svelte';
    import { getCourseDetails, updateCourse } from '../service/CourseService';
    import { navigate } from 'svelte-routing';
    import {selectedCourseId, showCourseDetails, showEditCourse} from "../Stores/stores";

    export let courseId: string;
    let course = { name: '', signups: 0, instructor: '', capacity: 0 , isUserInCourse: false};
    let errorMessage = '';

    onMount(async () => {
        course = await getCourseDetails(courseId);
    });

    function handleUpdateCourse() {
        if (course.name === '') {
            errorMessage = "Course name must be present!";
            return;
        }
        if (course.instructor === '') {
            errorMessage = "Instructor name must be present!";
            return;
        }
        if (course.capacity <= 0) {
            errorMessage = "Capacity of students must be greater than 0!";
            return;
        }

        updateCourse(courseId, course)
            .then(success => {
                if (success) {
                  $showEditCourse = false
                    $showCourseDetails = true
                    $selectedCourseId = courseId
                } else {
                    errorMessage = "Failed to update the course!";
                }
            })
            .catch(error => {
                errorMessage = "An error occurred during course update.";
                console.error(error);
            });
    }
</script>

<div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full space-y-8">
        <h1 class="text-2xl font-bold">Edit {course.name}</h1>
        <div class="space-y-4">
            <label class="block">
                <span class="text-gray-700">Name:</span>
                <input bind:value={course.name} placeholder="Name" class="input input-bordered w-full" />
            </label>
            <label class="block">
                <span class="text-gray-700">Instructor:</span>
                <input bind:value={course.instructor} placeholder="Instructor" class="input input-bordered w-full" />
            </label>
            <label class="block">
                <span class="text-gray-700">Capacity:</span>
                <input bind:value={course.capacity} type="number" min="1" placeholder="0" class="input input-bordered w-full" />
            </label>
            <button on:click={handleUpdateCourse} class="btn btn-primary w-full">Update</button>
        </div>
        {#if errorMessage}
            <div class="mt-4 p-2 border border-red-500 bg-red-100">
                <p>{errorMessage}</p>
            </div>
        {/if}
    </div>
</div>
