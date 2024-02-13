import { useState, useEffect } from "react";
import { Renderer, Common } from "@k8slens/extensions";
import { getContainersByPodList, showLogs } from "./utils";

const {
  Component: { MenuItem, Icon, SubMenu, StatusBrick }
} = Renderer;

export const PodPinoPrettyLogsMenuItem = props => {
  const [pod, setPod] = useState(null);
  const [containerNames, setContainerNames] = useState(new Set());

  useEffect(() => {
    const containerNameList = getContainersByPodList(props.object);
    setPod(props.object);
    setContainerNames(containerNameList);
  }, [props.object]);

  // Show menu item only if pod has at least 1 container
  if (!pod || pod.getContainers().length <= 0) return null;

  return (
    <MenuItem onClick={Common.Util.prevDefault(() => showLogs(pod.getNs(), pod.getName(), "Logs", Array.from(containerNames)?.slice(-1)[0]))}>
      <Icon material="subject" interactive={props.toolbar} tooltip="Pino-pretty logs" />
      <span className="title">Pino-pretty logs</span>
      {containerNames.size >= 1 && (
        <>
          <Icon material="keyboard_arrow_right" />
          <SubMenu>
            {Array.from(containerNames).map(containerName => {
              return (
                <MenuItem
                  key={`only_${containerName}`}
                  onClick={Common.Util.prevDefault(() => showLogs(resourceNs, resourceName, resourceTitle, containerName))}
                >
                  <StatusBrick />
                  <span>{containerName}</span>
                </MenuItem>
              );
            })}
          </SubMenu>
        </>
      )}
    </MenuItem>
  );
};
