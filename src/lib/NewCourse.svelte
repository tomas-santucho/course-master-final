<script lang="ts">
    import { createCourse } from '../service/CourseService';
    import { createEventDispatcher } from 'svelte';

    let name = '';
    let instructor = '';
    let capacity = 0;
    let errorMessage = '';
    const dispatch = createEventDispatcher();

    function handleCreateCourse() {
        if (name === '') {
            errorMessage = "Course name must be present!";
            return;
        }
        if (instructor === '') {
            errorMessage = "Instructor name must be present!";
            return;
        }
        if (capacity <= 0) {
            errorMessage = "Capacity of students must be greater than 0!";
            return;
        }

        createCourse({ name, instructor, capacity })
            .then(success => {
                if (success) {
                    dispatch('close');
                } else {
                    errorMessage = "Failed to create the course!";
                }
            })
            .catch(error => {
                errorMessage = "An error occurred during course creation.";
                console.error(error);
            });
    }
</script>

<div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full space-y-8">
        <h1 class="text-2xl font-bold">Create a new course</h1>
        <div class="space-y-4">
            <label class="block">
                <span class="text-gray-700">Name:</span>
                <input bind:value={name} placeholder="Name" class="input input-bordered w-full" />
            </label>
            <label class="block">
                <span class="text-gray-700">Instructor:</span>
                <input bind:value={instructor} placeholder="Instructor" class="input input-bordered w-full" />
            </label>
            <label class="block">
                <span class="text-gray-700">Capacity:</span>
                <input bind:value={capacity} type="number" min="1" placeholder="0" class="input input-bordered w-full" />
            </label>
            <button on:click={handleCreateCourse} class="btn btn-primary w-full">Create</button>
        </div>
        {#if errorMessage}
            <div class="mt-4 p-2 border border-red-500 bg-red-100">
                <p>{errorMessage}</p>
            </div>
        {/if}
    </div>
</div>
