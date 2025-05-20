import "@testing-library/jest-dom";
import { TextEncoder } from "util";

// Make TextEncoder available globally
global.TextEncoder = TextEncoder;
