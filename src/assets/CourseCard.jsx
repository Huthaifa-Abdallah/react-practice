import './CourseCard.css';

function CourseCard({
    title = 'Untitled Course',
    description = 'No description available.',
    level = 'Beginner',
    completed = false,
    category = 'General',
    onCompletionClick,
}) {
    return (
        <article className={`course-card ${completed ? 'completed' : ''}`}>

            <div className="card-header">
                <span className={`category-badge ${category.toLowerCase()}`}>
                    {category}
                </span>

                <span className="level-badge">
                    {level}
                </span>
            </div>

            <div className="card-content">
                <h3>{title}</h3>

                <p className="course-description">
                    {description}
                </p>
            </div>

            <div className="completion-section">

                <div className="completion-status">
                    <div className={`status-dot ${completed ? 'done' : ''}`}></div>

                    <span>
                        {completed ? 'Completed' : 'Not completed'}
                    </span>
                </div>

                <button
                    className={`completion-button ${completed ? 'completed-button' : ''}`}
                    onClick={onCompletionClick}
                >
                    {completed ? '✓ Completed' : 'Mark as complete'}
                </button>

            </div>

        </article>
    );
}

export default CourseCard;