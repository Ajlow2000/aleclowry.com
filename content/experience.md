+++
title = "Experience"
+++

## Systems Software Engineer
**SRAM** • Feb 2025 - Present

Architect, implement, and support a cross platform Bluetooth Low Energy (BLE) library written in Rust to centralize BLE implementations across the company.
Directly supported the adoption of this library in applications used for manufacturing scenarios of new products.
Coordinated with our firmware engineers in Germany to provide holistic solutions to problems and standardize developer tooling company wide.

**Key achievements:**
- Implemented firmware update retry logic to improve DFU resiliency via "parameter back off" (reduced PRN, reduced data chunk sizes, etc)
- Built out a remotely accessible hardware-in-the-loop laboratory + a software stack for running arbitrary software against physical hardware (AXS devices)
- Built a framework for exposing complex Bluetooth scenarios as reproducible, easy to run commands in our internal cli application
- Integrated our cli's "scenario" tests with our remote hardware-in-the-loop lab for a reliable integration test suite that is part of our CI flow
- Benchmarked and limit tested concurrent DFU with standardized desktop BLE hardware

**Technologies:** Rust, C++, Tauri, Nrf52, TypeScript, Bluez, Corebluetooth, WinRT

## Associate Application Engineer
**SRAM** • Feb 2023 - Feb 2025

Maintained and extended Product Lifecycle Management software (PLM) called [Windchill](https://www.ptc.com/en/products/windchill).
Worked on a team of 3 software engineers in coordination with 6-8 Business Analysts located across all SRAM locations internationally who in turn interfaced with the design and manufacturing engineers to establish need for process improvement or new features in our PLM software.

**Key achievements:**
- Implemented new features used alongside Windchill to track hazardous materials in product BOMs for regional shipping compliance
- Contributed new features to and maintained a 20+ year old Java codebase
- Modernized and improved the projects use of Java's type system to catch more errors at compile time
- Refactored project-wide logging to reduce runtime performance by up to 45%
- Managed deployments of new releases across staging, training, and production environments
- Built UIs with [ExtJS](https://www.sencha.com/products/extjs)

**Technologies:** Java, Windchill, ExtJS, Windows Administration

## Software Engineer (College)
**Verve Industrial Protection** • Sept 2019 - Aug 2021

Supported an ICS/OT Endpoint Management solution by adding new device support and reverse engineering network traffic to and from PLCs.
Member of the Agentless Device Inventory (ADI) team.

**Key achievements:**
- Researched and investigated PLC's via reading manufacturer provided specifications or reverse engineering communication protocols with Wireshark
- Added new device support to our product by writing C modules that were exposed to the Python application via cpython
- Interacted with Rockwell, Hirschmann, and Bachmann family devices
- Built a Python library for performing Address Resolution Protocol scans from Windows XP hosts using exclusively Python 2.7 to satisfy vendor constraints

**Technologies:** C, Python2.7, Python3, Wireshark, Docker
