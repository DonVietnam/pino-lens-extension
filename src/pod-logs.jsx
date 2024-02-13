import React from "react";
import { Common, Renderer } from "@k8slens/extensions";

const {
  Component: { MenuItem, Icon, SubMenu, StatusBrick, logTabStore }
} = Renderer;

export class PodLogs {
  /**
   * Get the container name list by a list of pods.
   *
   * @param {import('@k8slens/extensions').Renderer.K8sApi.Pod} pod
   *   @returns {Set<String>} A set, without duplicates.
   */
  static getContainersByPodList(pod) {
    const result = new Set();
    pod
      .getContainers()
      .map(container => container.name)
      .forEach(name => result.add(name));
    return result;
  }

  /**
   * Construct the menu voices.
   * @param {*} props
   * @param {Set<String>} containerNames
   * @param {String} resourceNs
   * @param {String} resourceName
   * @param {String} resourceTitle
   */
  static uiMenu(props, containerNames, resourceNs, resourceName, resourceTitle) {
    return (
      <MenuItem
        onClick={Common.Util.prevDefault(() => this.podLogs(resourceNs, resourceName, resourceTitle, Array.from(containerNames)?.slice(-1)[0]))}
      >
        <Icon material="subject" interactive={props.toolbar} tooltip="Logs w/Pino" />
        <span className="title">Logs w/Pino</span>
        {containerNames.size >= 1 && (
          <>
            <Icon material="keyboard_arrow_right" />
            <SubMenu>
              {Array.from(containerNames).map(containerName => {
                return (
                  <MenuItem
                    key={`only_${containerName}`}
                    onClick={Common.Util.prevDefault(() => this.podLogs(resourceNs, resourceName, resourceTitle, containerName))}
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
  }

  /**
   *
   * @param {String} resourceNs
   * @param {String} resourceName
   * @param {String} resourceTitle
   * @param {String} [containerName]
   */
  static podLogs(resourceNs, resourceName, resourceTitle, containerName) {
    const cmd = `kubectl logs -f -n ${resourceNs} ${resourceName} -c ${containerName} --tail=300 | pino-pretty`;
    this.openTerminal(`${resourceTitle}: ${resourceName}:${containerName} | pino-pretty`, cmd);
  }

  /**
   *
   * @param {String} title
   * @param {String} command
   */
  static openTerminal(title, command) {
    const tab = Renderer.Component.createTerminalTab({
      title: title
    });

    Renderer.Component.terminalStore.sendCommand(command, {
      enter: true,
      tabId: tab.id
    });

    Renderer.Navigation.hideDetails();
  }
}
