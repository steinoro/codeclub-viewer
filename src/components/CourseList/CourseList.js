import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CourseItem from './CourseItem';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const CourseList = ({courses, language}) => (
  <Row>
    <div>
      {courses.map(course => (
        <Col key={course} xs={6} sm={6} md={4} lg={3}>
          <CourseItem {...{course, language}}/>
        </Col>
      ))}
    </div>
  </Row>
);

CourseList.propTypes = {
  // ownProps
  courses: PropTypes.arrayOf(PropTypes.string).isRequired,

  // mapStateToProps
  language: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps
)(CourseList);
