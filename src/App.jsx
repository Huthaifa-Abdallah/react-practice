import { useState } from 'react';
import CourseCard from './assets/CourseCard.jsx';
import './App.css';

function App() {
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: 'C# Fundamentals',
            description: 'Learn the core concepts of C# and build a strong foundation for backend development.',
            level: 'Beginner',
            completed: true,
            category: 'Backend',
        },
        {
            id: 2,
            title: 'React Fundamentals',
            description: 'Learn how to build interactive user interfaces using components and state.',
            level: 'Beginner',
            completed: false,
            category: 'Frontend',
        },
        {
            id: 3,
            title: 'ASP.NET Core',
            description: 'Build modern web APIs using ASP.NET Core and explore backend architecture.',
            level: 'Intermediate',
            completed: false,
            category: 'Backend',
        },
        {
            id: 4,
            title: 'SQL & Databases',
            description: 'Understand relational databases, queries, joins, and data management.',
            level: 'Intermediate',
            completed: true,
            category: 'Database',
        },
        {
            id: 5,
            title: 'JavaScript Essentials',
            description: 'Master the fundamentals of JavaScript and prepare for frontend development.',
            level: 'Beginner',
            completed: false,
            category: 'Frontend',
        },
        {
            id: 6,
            title: 'AWS Fundamentals',
            description: 'Explore cloud computing and the core services provided by AWS.',
            level: 'Beginner',
            completed: false,
            category: 'Cloud',
        },
    ]);

    const [search, setSearch] = useState('');

    function handleCompletion(courseId) {
        setCourses(previousCourses =>
            previousCourses.map(course =>
                course.id === courseId
                    ? { ...course, completed: !course.completed }
                    : course
            )
        );
    }

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase())
    );

    const completedCourses = courses.filter(course => course.completed).length;
    const totalCourses = courses.length;
    const inProgressCourses = totalCourses - completedCourses;

    return (
        <div className="app">
            <header className="navbar">
                <div className="navbar-content">
                    <div className="brand">
                        <div className="brand-icon">L</div>
                        <span>Learnify</span>
                    </div>

                    <div className="navbar-label">
                        My Learning Dashboard
                    </div>
                </div>
            </header>

            <main className="main-container">

                <section className="hero">
                    <div className="hero-content">
                        <span className="hero-label">
                            YOUR LEARNING JOURNEY
                        </span>

                        <h1>
                            Learn something
                            <span> new today.</span>
                        </h1>

                        <p>
                            Keep track of your courses, explore new topics,
                            and build your skills one step at a time.
                        </p>
                    </div>

                    <div className="hero-decoration">
                        <div className="decoration-circle circle-one"></div>
                        <div className="decoration-circle circle-two"></div>
                        <div className="decoration-circle circle-three"></div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="stats-container">

                    <div className="stat-card">
                        <div className="stat-icon purple">
                            📚
                        </div>

                        <div className="stat-info">
                            <p>Total Courses</p>
                            <h2>{totalCourses}</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon green">
                            ✓
                        </div>

                        <div className="stat-info">
                            <p>Completed</p>
                            <h2>{completedCourses}</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orange">
                            ↗
                        </div>

                        <div className="stat-info">
                            <p>In Progress</p>
                            <h2>{inProgressCourses}</h2>
                        </div>
                    </div>

                </section>

                {/* Courses */}
                <section className="courses-section">

                    <div className="section-header">
                        <div>
                            <h2>My Courses</h2>
                            <p>Explore and manage your learning</p>
                        </div>

                        <div className="course-count">
                            {filteredCourses.length} courses
                        </div>
                    </div>

                    {/* Search */}
                    <div className="search-container">
                        <span className="search-icon">⌕</span>

                        <input
                            type="text"
                            placeholder="Search courses or categories..."
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                        />

                        {search && (
                            <button
                                className="clear-search"
                                onClick={() => setSearch('')}
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* Course Cards */}
                    <div className="course-grid">
                        {filteredCourses.map(course => (
                            <CourseCard
                                key={course.id}
                                title={course.title}
                                description={course.description}
                                level={course.level}
                                completed={course.completed}
                                category={course.category}
                                onCompletionClick={() => handleCompletion(course.id)}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCourses.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">🔍</div>

                            <h3>No courses found</h3>

                            <p>
                                Try searching for a different course or category.
                            </p>

                            <button
                                className="reset-search"
                                onClick={() => setSearch('')}
                            >
                                Clear search
                            </button>
                        </div>
                    )}

                </section>

                <footer className="footer">
                    <p>
                        Made with <span>♥</span> using React
                    </p>
                </footer>

            </main>
        </div>
    );
}

export default App;