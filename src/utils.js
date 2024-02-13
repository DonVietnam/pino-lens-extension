import { Renderer } from "@k8slens/extensions";

/**
 *
 * @param {String} resourceNs
 * @param {String} resourceName
 * @param {String} resourceTitle
 * @param {String} [containerName]
 */
export const showLogs = (resourceNs, resourceName, resourceTitle, containerName) => {
  const PINO_PRETTY_COMMAND = "pino-pretty -c -C";
  const command = `kubectl logs -f -n ${resourceNs} ${resourceName} -c ${containerName} --tail=300 | ${PINO_PRETTY_COMMAND}`;
  const title = `${resourceTitle}: ${resourceName}:${containerName}`;

  const tab = Renderer.Component.createTerminalTab({ title: title });

  Renderer.Component.terminalStore.sendCommand(command, { enter: true, tabId: tab.id });

  Renderer.Navigation.hideDetails();
};

/**
 * Get the container name list by a list of pods.
 *
 * @param {import('@k8slens/extensions').Renderer.K8sApi.Pod} pod
 *   @returns {Set<String>} A set, without duplicates.
 */
export const getContainersByPodList = pod => {
  const result = new Set();
  pod
    .getContainers()
    .map(container => container.name)
    .forEach(name => result.add(name));
  return result;
};
