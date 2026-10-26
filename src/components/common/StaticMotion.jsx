// These wrappers retain the existing semantic JSX while omitting an animation
// library. They demonstrate reusable components and props from the syllabus.
function withoutAnimationProps({ initial, animate, whileHover, whileInView, transition, viewport, variants, ...props }) {
  return props
}

function MotionA(props) { return <a {...withoutAnimationProps(props)} /> }
function MotionButton(props) { return <button {...withoutAnimationProps(props)} /> }
function MotionDetails(props) { return <details {...withoutAnimationProps(props)} /> }
function MotionDiv(props) { return <div {...withoutAnimationProps(props)} /> }
function MotionForm(props) { return <form {...withoutAnimationProps(props)} /> }
function MotionH1(props) { return <h1 {...withoutAnimationProps(props)} /> }
function MotionP(props) { return <p {...withoutAnimationProps(props)} /> }
function MotionSection(props) { return <section {...withoutAnimationProps(props)} /> }

export const motion = { a: MotionA, button: MotionButton, details: MotionDetails, div: MotionDiv, form: MotionForm, h1: MotionH1, p: MotionP, section: MotionSection }
