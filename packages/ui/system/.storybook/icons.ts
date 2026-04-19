import { addCollection } from "@iconify/react";
import hugeicons from "@iconify-json/hugeicons/icons.json";

// Register the full HugeIcons free pack. Stories call <Icon name="hugeicons:…" />
// and Iconify resolves from this in-memory collection — zero-network.
addCollection(hugeicons);
