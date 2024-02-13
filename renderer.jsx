import { Renderer } from "@k8slens/extensions";
import React from "react";
import { PodPinoPrettyLogsMenuItem } from "./src/pod-logs-menu";

export default class PinoPrettyLensExtensionRenderer extends Renderer.LensExtension {
  onActivate() {}

  kubeObjectMenuItems = [
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: props => <PodPinoPrettyLogsMenuItem {...props} />
      }
    }
  ];
}
