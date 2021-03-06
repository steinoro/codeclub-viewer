import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import CollapsiblePanel from '../CollapsiblePanel';
import {getCourseInfo} from '../../resources/courseContent';
import {getTranslator} from '../../selectors/translate';
import {processCourseInfo} from '../../utils/processCourseInfo';
import {getLanguageIndependentCoursePath} from '../../resources/courses';

const CourseInfo = ({t, isStudentMode, courseInfo}) => {
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  return (
    <CollapsiblePanel initiallyExpanded={false} header={t('coursepage.courseinfo')} {...{bsStyle}}>
      {courseInfo.__html ?
        <Panel.Body><div dangerouslySetInnerHTML={courseInfo}/></Panel.Body>
        :
        <Panel.Body><h4>{t('coursepage.courseinfonotfound')}</h4></Panel.Body>
      }
    </CollapsiblePanel>
  );
};

CourseInfo.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  courseInfo: PropTypes.shape({__html: PropTypes.string}).isRequired,
  isStudentMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state, {courseName}) => ({
  t: getTranslator(state),
  courseInfo: {
    __html: processCourseInfo(
      getCourseInfo(courseName, state.language),
      {baseurl: getLanguageIndependentCoursePath(courseName)},
    ),
  },
  isStudentMode: state.isStudentMode
});

export default connect(
  mapStateToProps
)(CourseInfo);
