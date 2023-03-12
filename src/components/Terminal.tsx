import * as React from "react";

export interface TerminalItem {
  title?: string;
  subtitle?: string;
  description: string;
  period?: TerminalPeriodItem;
  location?: string;
  url?: string;
  keywords?: Array<string>;
}

interface TerminalPeriodItem {
  init: string;
  end: string;
}

export default function Terminal({items}: { items: Array<TerminalItem> }) {

  return (
    <div className="info-container text-left">
      {items.map((item, idx) => (
        <div className="item-list animate-show-hide" key={`item-${idx}`}>


          {item.title &&
            <h3 className="post-subtitle">
              {item.title}
              {item.url && <a href={item.url} target="_blank">
                &nbsp;<span className="glyphicon glyphicon-link" aria-hidden="true"/>
              </a>}
            </h3>
          }

          <h4>
            {item.subtitle && <small> {item.subtitle}.</small>}
            {item.period && <small> {item.period.init} - {item.period.end}.</small>}
            {item.location && <small> {item.location}.</small>}
          </h4>

          {item.description &&
            <p className="post-meta">{item.description}
              {!item.title && item.url && <a
                href={item.url} target="_blank">
                <span className="glyphicon glyphicon-link" aria-hidden="true"/>
              </a>}
            </p>
          }
          <div>
            {item.keywords && item.keywords.map((keyword, idx) => (
              <span className="label label-default" key={`kw-${idx}`}>{keyword}</span>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}
