import {
  getSlices,
  SliceSimulator,
  SliceSimulatorParams,
} from "@prismicio/next";

import { components } from "../../slices";
import { SliceZone } from "@prismicio/react";

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
