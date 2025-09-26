# System Specifications

### Hardware Overview
```
┌─────────────────┬─────────────────────────────────────┐
│ Component       │ Specification                       │
├─────────────────┼─────────────────────────────────────┤
│ Processor       │ Apple M1 (8 cores)                 │
│ Memory          │ 16 GB RAM                          │
│ Storage         │ Apple SSD AP0256Q (256GB)          │
│ Available Space │ 50.57 GB                           │
│ OS              │ macOS (Darwin 25.0.0)              │
│ Architecture    │ Apple Silicon (ARM64)              │
└─────────────────┴─────────────────────────────────────┘
```

## Socket.IO Server Performance Limits
### Resource Limits Table
```
┌─────────────────────┬─────────────┬─────────────────────────────────────┐
│ Parameter           │ Value       │ Socket.IO Impact                    │
├─────────────────────┼─────────────┼─────────────────────────────────────┤
│ file descriptors    │ 1,048,575   │ **Critical for connections**        │
└─────────────────────┴─────────────┴─────────────────────────────────────┘
```
## Configuration Documentation Links
- **Socket.IO Official Docs**: https://socket.io/docs/v4/
- **Server Options**: https://socket.io/docs/v4/server-options/
- **Server Installation**: https://socket.io/docs/v4/server-installation/
- **System Limits (ulimit)**: https://phoenixnap.com/kb/ulimit-linux-command
- **IBM ulimit Guidelines**: https://www.ibm.com/support/pages/guidelines-setting-ulimits-websphere-application-server/
- **MongoDB ulimit Reference**: https://www.mongodb.com/docs/manual/reference/ulimit/
- **Oracle ulimit Manual**: https://docs.oracle.com/cd/E88353_01/html/E37839/ulimit-1.html

---
*Generated on: $(date)*

## Benchmarks

### Config: connections=10000, rate=50/s, duration=60s, interval=2000ms, port=3344

#### Benchmark Summary
```
┌──────────────────────────────┬────────────────────────────┐
│ Metric                       │ Value                      │
├──────────────────────────────┼────────────────────────────┤
│ Date                         │ $(date)                    │
│ Target                       │ localhost:3344             │
│ Connections                  │ 10,000                     │
│ Duration / Rate              │ 60s (message) / 50 conn/s  │
│ Success / Fail               │ 100% / 0%                  │
│ Avg connect time             │ 213 ms                     │
│ Peak RAM (process)           │ ~313 MB                    │
│ Peak CPU                     │ ~11.3%                     │
│ RAM per connection (approx.) │ ~39.3 KB                   │
│ Est. max at this footprint   │ ~53,315 connections        │
└──────────────────────────────┴────────────────────────────┘
```

Notes:
- Two phases by design (per client.ts):
  1) Connect 10,000 clients at 50 conn/s (≈200s total)
  2) Keep-alive for 60s and send messages every 2000ms
- Message testing targets a random sample (up to 10 clients) each interval
- RAM spiked >300 MB during message phase (server processing overhead)
- See terminal for raw server/client logs

#### Connections vs RAM RSS (with phase)
```
┌────────────┬──────────────┬─────────┐
│ Phase      │ Connections  │ RAM RSS │
├────────────┼──────────────┼─────────┤
│ Idle       │ 0            │ 53 MB   │
│ Idle       │ 1,000        │ 116 MB  │
│ Idle       │ 2,000        │ 120 MB  │
│ Idle       │ 3,000        │ 136 MB  │
│ Idle       │ 4,000        │ 158 MB  │
│ Idle       │ 5,000        │ 174 MB  │
│ Idle       │ 6,000        │ 189 MB  │
│ Idle       │ 7,000        │ 205 MB  │
│ Idle       │ 8,000        │ 212 MB  │
│ Idle       │ 9,000        │ 236 MB  │
│ Idle       │ 10,000       │ 273 MB  │
│ Message    │ 10,000       │ 313 MB  │
└────────────┴──────────────┴─────────┘
```

#### Local Message Delivery Coverage (9 runs)
```
┌─────────┬────────────────────────┬──────────┬──────────┬──────────┐
│ (index) │ Message ID             │ Expected │ Received │ Coverage │
├─────────┼────────────────────────┼──────────┼──────────┼──────────┤
│ 0       │ 1758869768943-vq3j9h  │ 9,999    │ 9,999    │ 100.0%   │
│ 1       │ 1758869769877-5hdngz  │ 9,999    │ 9,999    │ 100.0%   │
│ 2       │ 1758869770918-0egamt  │ 9,999    │ 9,999    │ 100.0%   │
│ 3       │ 1758869771973-1umjf7  │ 9,999    │ 9,999    │ 100.0%   │
│ 4       │ 1758869772898-yp0uzt  │ 9,999    │ 9,999    │ 100.0%   │
│ 5       │ 1758869773979-g8268c  │ 9,999    │ 9,999    │ 100.0%   │
│ 6       │ 1758869774881-88q439  │ 9,999    │ 9,999    │ 100.0%   │
│ 7       │ 1758869775934-8qglwb  │ 9,999    │ 9,999    │ 100.0%   │
│ 8       │ 1758869776842-ku81cp  │ 9,999    │ 9,999    │ 100.0%   │
└─────────┴────────────────────────┴──────────┴──────────┴──────────┘
```

<!-- To add a new test case, duplicate this subsection and adjust the config line and tables accordingly. -->

