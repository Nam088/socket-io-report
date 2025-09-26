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

---

## Benchmarks

### Test case: connections=10000, rate=50/s, duration=60s, interval=2000ms, port=3344

Notes:
- Two phases by design (per client.ts):
  1) Connect 10,000 clients at 50 conn/s (≈200s total)
  2) Keep-alive for 60s and send messages every 2000ms
- Message testing targets a random sample (up to 10 clients) each interval
- RAM spiked >300 MB during message phase (server processing overhead)
- See terminal for raw server/client logs

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
│ Message    │ 10,000       │ ~313 MB │
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


### Test case: connections=10000, rate=200/s, duration=45s, interval=1000ms, port=3344

Notes:
- Two phases by design (per client.ts):
  1) Connect 10,000 clients at 200 conn/s (≈50.2s total)
  2) Keep-alive for 45s and send messages every 1000ms
- Intermittent client ping timeouts observed around tear-down; no impact on connection success
- CPU saturated during peak

#### Benchmark Summary
```
┌──────────────────────────────┬────────────────────────────┐
│ Metric                       │ Value                      │
├──────────────────────────────┼────────────────────────────┤
│ Date                         │ $(date)                    │
│ Target                       │ localhost:3344             │
│ Connections                  │ 10,000                     │
│ Duration / Rate              │ 45s (message) / 200 conn/s │
│ Success / Fail               │ 100% / 0%                  │
│ Avg connect time             │ 284 ms                     │
│ Peak RAM (process)           │ ~549.2 MB                  │
│ Peak CPU                     │ ~100%                      │
│ RAM per connection (approx.) │ ~56.2 KB                   │
│ Est. max at this footprint   │ ~37,290 connections        │
│ Overall score (B)            │ 78.9%                      │
└──────────────────────────────┴────────────────────────────┘
```

#### Connections vs RAM RSS (with phase)
```
┌────────────┬────────────────────┬─────────┐
│ Phase      │ Connections total  │ RAM RSS │
├────────────┼────────────────────┼─────────┤
│ Idle       │ 1                  │ 77.48MB │
│ Idle       │ 461                │ 104.86MB│
│ Idle       │ 1,460              │ 138.03MB│
│ Idle       │ 2,459              │ 154.48MB│
│ Idle       │ 3,459              │ 161.17MB│
│ Idle       │ 4,458              │ 179.56MB│
│ Idle       │ 5,458              │ 188.56MB│
│ Idle       │ 6,457              │ 206.56MB│
│ Idle       │ 7,457              │ 221.42MB│
│ Idle       │ 8,457              │ 242.31MB│
│ Idle       │ 9,457              │ 250.77MB│
│ Idle       │ 10,000             │ 277.84MB│
│ Message    │ 10,000 (peak)      │~549.20MB│
└────────────┴────────────────────┴─────────┘
```

