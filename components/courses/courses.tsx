const CoursesComponent = () => {
    return (
        < div className="container-xxl courses  pb-0" >
            <div className="container">
                <div className="text-center mx-auto mb-5 wow fadeInUp max-w-[500px]" data-wow-delay="0.1s">
                    <h6 className="text-primary text-uppercase mb-2">Driving Courses</h6>
                    <h1 className="display-6 mb-4">Our Courses Upskill You With Driving Training</h1>
                </div>
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                            <div className="text-center p-4 pt-0">
                                <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">$99</div>
                                <h5 className="mb-3">Automatic Car Lessons</h5>
                                <p>Tempor erat elitr rebum at clita dolor diam ipsum sit diam amet diam et eos</p>
                                <ol className="breadcrumb justify-content-center mb-0">
                                    <li className="breadcrumb-item small"><i className="fa fa-signal text-primary me-2"></i>Beginner</li>
                                    <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Week</li>
                                </ol>
                            </div>
                            <div className="position-relative mt-auto">
                                <img className="img-fluid" src="/images/courses-1.jpg" alt="" />
                                <div className="courses-overlay">
                                    <a className="btn btn-outline-primary border-2" href="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                            <div className="text-center p-4 pt-0">
                                <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">$99</div>
                                <h5 className="mb-3">Highway Driving Lesson</h5>
                                <p>Tempor erat elitr rebum at clita dolor diam ipsum sit diam amet diam et eos</p>
                                <ol className="breadcrumb justify-content-center mb-0">
                                    <li className="breadcrumb-item small"><i className="fa fa-signal text-primary me-2"></i>Beginner</li>
                                    <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Week</li>
                                </ol>
                            </div>
                            <div className="position-relative mt-auto">
                                <img className="img-fluid" src="/images/courses-2.jpg" alt="" />
                                <div className="courses-overlay">
                                    <a className="btn btn-outline-primary border-2" href="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                            <div className="text-center p-4 pt-0">
                                <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">$99</div>
                                <h5 className="mb-3">International Driving</h5>
                                <p>Tempor erat elitr rebum at clita dolor diam ipsum sit diam amet diam et eos</p>
                                <ol className="breadcrumb justify-content-center mb-0">
                                    <li className="breadcrumb-item small"><i className="fa fa-signal text-primary me-2"></i>Beginner</li>
                                    <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Week</li>
                                </ol>
                            </div>
                            <div className="position-relative mt-auto">
                                <img className="img-fluid" src="/images/courses-3.jpg" alt="" />
                                <div className="courses-overlay">
                                    <a className="btn btn-outline-primary border-2" href="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default CoursesComponent;