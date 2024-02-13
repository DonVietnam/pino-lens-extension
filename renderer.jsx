import { Renderer } from "@k8slens/extensions";
import React from "react";
import { PodPinoLogsMenuItem } from "./src/pod-logs-menu";

export default class PinoLensExtensionRenderer extends Renderer.LensExtension {
  onActivate() {}

  kubeObjectMenuItems = [
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: props => <PodPinoLogsMenuItem {...props} />
      }
    }
  ];
}
