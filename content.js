async function getCourses() {
    const response = await fetch("/api/v1/courses?enrollment_state=active")
    const data = await response.json();
    for (const course of data) {
        console.log(course.course_code, course.id);
        await getAssignments(course.id);
    }
}
getCourses();

async function getAssignments(courseID) {
    const url = `/api/v1/courses/${courseID}/assignments?per_page=100`;
    const response = await fetch(url);
    const assignments = await response.json();
    console.log(assignments);
}
