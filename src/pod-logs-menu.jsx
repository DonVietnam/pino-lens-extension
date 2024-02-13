import { useState, useEffect } from "react";
import { PodLogs } from "./pod-logs";

/**
 * @typedef {import('@k8slens/extensions').Renderer.K8sApi.Pod} Pod
 */

/**
 *
 * @param {import('@k8slens/extensions').Renderer.Component.KubeObjectMenuProps<Pod>} props
 */
export const PodPinoLogsMenuItem = props => {
  const { object } = props;
  const [pod, setPod] = useState(null);
  const [containerNames, setContainerNames] = useState(new Set());

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchData() {
      try {
        // Get all containers in the pod
        const containerNameList = PodLogs.getContainersByPodList(object);

        if (isMounted) {
          // Update state only if component is still mounted
          setPod(object);
          setContainerNames(containerNameList);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [object]);

  // Show menu item only if pod has at least 1 container
  if (!pod || pod.getContainers().length <= 0) {
    return null;
  }

  // Render menu item UI (and associate onClick action)
  return PodLogs.uiMenu(props, containerNames, pod.getNs(), pod.getName(), "Logs");
};
