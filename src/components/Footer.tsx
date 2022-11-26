import * as React from "react";

export default class Footer extends React.Component<{}> {
  render() {
    const today = new Date();

    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="text-center">
              <div className="footer-item">
                Copyright &copy; Alberto Ramírez {today.getFullYear()}
              </div>
              <div className="footer-item">
                <a
                  href="mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;&#097;&#114;&#097;&#109;&#105;&#114;&#101;&#122;&#111;&#099;&#104;&#111;&#097;&#046;&#099;&#111;&#109;">
                  &#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;&#097;&#114;&#097;&#109;&#105;&#114;&#101;&#122;&#111;&#099;&#104;&#111;&#097;&#046;&#099;&#111;&#109;</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}