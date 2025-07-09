import React from 'react';

interface InsightCardProps {
  title: string;
  message: string;
  highlight?: string;
  color?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  message,
  highlight,
  color = 'blue',
}) => {
  return (
    <div className={`p-4 rounded-xl shadow border-l-4 border-${color}-500 bg-white`}>
      <h4 className="text-sm font-semibold text-gray-600 mb-1">{title}</h4>
      <p className="text-gray-800 text-sm">
        {message}
        {highlight && (
          <span className={`ml-1 font-semibold text-${color}-600`}>
            {highlight}
          </span>
        )}
      </p>
    </div>
  );
};
