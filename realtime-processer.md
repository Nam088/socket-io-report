# Realtime Processor Status

### Pod Overview
```
┌─────────────────┬─────────────────────────────────────┐
│ Component       │ Specification                       │
├─────────────────┼─────────────────────────────────────┤
│ Name            │ drkumo-realtime-processor-7cd59989f6│
│ Namespace       │ d5                                  │
│ Status          │ Running (2/2 Ready)                │
│ Node            │ ip-10-0-14-98.us-west-2.compute    │
│ Start Time      │ Fri, 26 Sep 2025 04:46:26 +0700    │
└─────────────────┴─────────────────────────────────────┘
```

## Resource Configuration
### Resource Limits Table
```
┌─────────────────────┬─────────────┬─────────────────────────────────────┐
│ Parameter           │ Value       │ Socket.IO Impact                    │
├─────────────────────┼─────────────┼─────────────────────────────────────┤
│ CPU Request         │ 2 cores     │ CPU Limit: 4 cores                 │
│ Memory Request      │ 4 GB        │ Memory Limit: 8 GB                 │
│ HTTP Port           │ 8000        │ Health Port: 8888                  │
└─────────────────────┴─────────────┴─────────────────────────────────────┘
```

### Actual Resource Usage
```
┌─────────────────────┬─────────────┬─────────────────────────────────────┐
│ Component           │ Usage       │ Socket.IO Impact                    │
├─────────────────────┼─────────────┼─────────────────────────────────────┤
│ CPU Usage           │ 3m cores    │ Very low CPU consumption           │
│ Memory Usage        │ 105 MiB     │ Low memory usage (2.6% of limit)   │
│ Istio Proxy         │ 56 MiB      │ Service mesh overhead              │
└─────────────────────┴─────────────┴─────────────────────────────────────┘
```

### Container Details
- **Image**: 365065407543.dkr.ecr.us-west-2.amazonaws.com/drkumo-realtime-processor:ddd8938
- **Command**: `/opt/drkumo/drkumo-realtime-processor/bootstrap.sh node bundle`
- **Health Check**: Active liveness/readiness probes
- **AWS Integration**: IAM role-based authentication
- **Istio**: Service mesh enabled

## Pod Resource Limits (ulimit -a)
### Resource Limits Table
```
┌─────────────────────┬─────────────┬─────────────────────────────────────┐
│ Parameter           │ Value       │ Socket.IO Impact                    │
├─────────────────────┼─────────────┼─────────────────────────────────────┤
│ file descriptors    │ 1,048,576   │ **Critical for connections**        │
└─────────────────────┴─────────────┴─────────────────────────────────────┘
```

## Connections vs RAM RSS (idle vs message vs system)
```
┌──────────────┬─────────────┬───────────────┬─────────────┐
│ Connections  │ Idle (MB)   │ Message (MB)  │ System (MB) │
├──────────────┼─────────────┼───────────────┼─────────────┤
│ 0            │ 53          │ 60            │             │
│ 1,000        │ 116         │ 120           │             │
│ 2,000        │ 120         │ 136           │             │
│ 3,000        │ 136         │ 153           │             │
│ 4,000        │ 158         │ 158           │             │
│ 5,000        │ 174         │ 174           │             │
│ 6,000        │ 189         │ 189           │             │
│ 7,000        │ 205         │ 205           │             │
│ 8,000        │ 212         │ 213           │             │
│ 9,000        │ 236         │ 236           │             │
│ 10,000       │ 273         │ 313           │ 384         │
└──────────────┴─────────────┴───────────────┴─────────────┘
```
