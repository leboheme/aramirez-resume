import * as React from "react";

export default class Title extends React.Component<{}> {
  render() {
    return (
      <div className="container">
        <div className="row hidden-xs">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 box-title">
            <div className="box-subtitle">
              <h1>
                Alberto A. Ramírez Ochoa's resume
              </h1>
              <h1>
                <small>Senior Software Engineer</small>
              </h1>
            </div>
          </div>
        </div>
        <div className="row visible-xs">
          <div className="col-xs-12 box-title">
            <div className="box-subtitle">
              <h4>
                Alberto's resume
              </h4>
              <h4>
                <small>Senior Software Engineer</small>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}