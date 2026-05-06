import React from "react";
import NotificationCard from "./NotificationCard";

const getPriorityScore = (notification) => {
  let score = 0;

  if (notification.Type === "Placement") score += 30;
  if (notification.Type === "Result") score += 20;
  if (notification.Type === "Event") score += 10;

  return score;
};

const PriorityNotifications = ({ notifications }) => {

  const topNotifications = [...notifications]
    .sort(
      (a, b) =>
        getPriorityScore(b) - getPriorityScore(a)
    )
    .slice(0, 5);

  return (
    <div>
      {topNotifications.map((notification) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
        />
      ))}
    </div>
  );
};

export default PriorityNotifications;