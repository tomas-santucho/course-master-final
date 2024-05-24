<script lang="ts">
    import LoginRegister from "./lib/LoginRegister.svelte";
    import Courses from "./lib/Courses.svelte";
    import NewCourse from "./lib/NewCourse.svelte";
    import CourseDetails from "./lib/CourseDetails.svelte";
    import {isLoggedIn, showNewCourse, selectedCourseId, showCourseDetails, showEditCourse} from "./Stores/stores";
    import { writable } from 'svelte/store';
    import EditCourse from "./lib/EditCourse.svelte";

    function handleShowNewCourse() {
        showNewCourse.set(true);
    }

    function handleShowCourses() {
        showNewCourse.set(false);
        selectedCourseId.set(null);
    }

    function handleShowCourseDetails(courseId) {
        selectedCourseId.set(courseId);
    }

</script>


{#if !$isLoggedIn}
    <LoginRegister />
{:else}
    {#if $showNewCourse}
        <NewCourse on:close={handleShowCourses} />
    {:else if $showCourseDetails}
        <CourseDetails courseId={$selectedCourseId} on:close={handleShowCourses} />
    {:else if $showEditCourse}
        <EditCourse courseId={$selectedCourseId} on:close={handleShowCourses} />
    {:else}
        <Courses on:addCourse={handleShowNewCourse} on:viewCourseDetails={handleShowCourseDetails} />
    {/if}
{/if}
