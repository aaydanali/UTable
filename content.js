function isCurrentTerm(course) {
    const term = course.term;
    if (!term) return false;

    const now = new Date();
    const started = term.start_at === null || now >= new Date(term.start_at);
    const notEnded = term.end_at === null || now < new Date(term.end_at);

    return started && notEnded;
}

async function getCourses() {
    const response = await fetch("/api/v1/courses?enrollment_state=active&include[]=term")
    const data = await response.json();
    const current = data.filter(isCurrentTerm);
    console.log(data.length, "courses \u2192", current.length, "this term");

    for (const course of current) {
        console.log(course.course_code, course.id, course.term?.name);
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
