<script lang="ts">
    import { onMount } from 'svelte';
    import { deleteCourseById, getCourseDetails, removeUserFromCourse } from "../service/CourseService";
    import { createEventDispatcher } from 'svelte';
    import {selectedCourse, showCourseDetails, showEditCourse} from "../Stores/stores";

    export let courseId: string;
    let course = null;
    let sortType = 'asc';
    let currentUser = null;

    onMount(async () => {
        course = await getCourseDetails(courseId);
        currentUser = localStorage.getItem("user-name");
    });

    function closeDetails() {
        $showCourseDetails = false;
    }

    function sortUsers() {
        if (sortType === 'asc') {
            course.users.sort((a, b) => new Date(a.signUpDate) - new Date(b.signUpDate));
        } else {
            course.users.sort((a, b) => new Date(b.signUpDate) - new Date(a.signUpDate));
        }
    }

    async function handleRemoveUser(userId) {
        try {
            await removeUserFromCourse(courseId, userId);
            course = await getCourseDetails(courseId);
            $selectedCourse = course
        } catch (error) {
            console.error(error);
        }
    }

    $: if (course) {
        sortUsers();
    }

    async function deleteCourse() {
        try {
            await deleteCourseById(courseId);
            closeDetails();
        } catch (error) {
            console.error(error);
        }
    }

    function edit(edit: string, course: any) {
        $showCourseDetails = false
        $showEditCourse = true

    }
</script>

{#if course}
    <div class="container mx-auto py-4">
        <h1 class="text-2xl font-bold">{course.name}</h1>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Sign Ups:</strong> {course.users.length}</p>
        <div class="my-4">
            <a href="#" on:click={() => { sortType = 'asc'; sortUsers(); }} class="link mx-2">Sign Up Date ASC</a>
            <a href="#" on:click={() => { sortType = 'desc'; sortUsers(); }} class="link mx-2">Sign Up Date DESC</a>
        </div>
        <table class="table table-auto w-full">
            <thead>
            <tr>
                <th>Name</th>
                <th>Sign Up Date</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {#each course.users as user}
                <tr>
                    <td>{user.name}</td>
                    <td>{new Date(user.signUpDate).toLocaleDateString()}</td>
                    <td>
                        {#if course.isUserInCourse && user.name === localStorage.getItem("user-name")}
                            <button class="btn btn-link" on:click={() => handleRemoveUser(user.id)}>Remove</button>
                        {/if}
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
        <div class="flex justify-between mt-4">
            <button class="btn btn-secondary" on:click={closeDetails}>Back</button>
            <button class="btn btn-primary" on:click={() => edit('edit', course)}>Edit</button>
            <button class="btn btn-danger" on:click={deleteCourse}>Delete</button>
        </div>
    </div>
{:else}
    <div>Loading...</div>
{/if}
