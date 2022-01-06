# Scripts

## Attack

### cc.js

Command & Control script, used to feed data into attack-scripts to reduce their memory overhead down to 2gb, enabling more scripts to be ran on each server.

```
run attack/cc.js <attacktarget>
```

Initialize the CC with an attack-target.

```
run attack/cc.js
```

Runs the CC (Runs forever)

```
run attack/cc.js peek
```

Prints current data being broadcasted by the CC

### deploy.js

Deployment-script that roots every server that can be rooted.

```
run attack/deploy.js
```

Deploys to EVERY single server, and kills/restarts servers that are already running our hack-script.

```
run attack/deploy.js skip
```

Deploys to NEW servers (i.e servers that has NOT been rooted yet).

### loop.js

Primary script deployed onto rooted servers to continually grow/weaken/hack servers

```
run attack/loop.js
```

## Hacknet

### list.js

List all hacknet nodes.

```
run hacknet/list.js
```

### upgrade.js

Upgrades ALL hacknet-nodes (with confirmation-prompt before acting).

```
run hacknet/upgrade.js
```

Displays possible commands

```
run hacknet/upgrade.js level=N
```

Upgrades all hacknet nodes to level N.

```
run hacknet/upgrade.js ram=N
```

Upgrades all hacknet nodes ram to 2^(N-1).
N=1 == 1GB (baseline)
N=2 == 2GB
N=3 == 4gb
N=4 == 8gb,
etc

```
run hacknet/upgrade.js core=N
```

Upgrades all hacknet nodes to a core-count of N.

```
run hacknet/upgrade.js node=N
```

Increase the number of hacknet-nodes up to N.

## Util

### heartbeat.js

```
run util/heartbeat.js
```

Runs continually, and will print every hour if there are servers currently underutilized (unused RAM that can be used for attacking)

### new-servers.js

```
run util/new-servers.js <N>
```

Purchase MAX amount of servers with <N> GB of ram. Once you run out of money, the script will just sleep/wait until you get enough. Script will terminate once all servers has been purchased.

### planning-new-servers.js

```
run util/planning-new-servers.js
```

Analyze if/how much of an upgrade you can afford

### rp.js

```
run util/rp.js
```

Prints the path/command to backdoor servers that are part of the story/RP without having to scan-analyze to find their path/location

### scan.js

```
run util/scan.js
```

Prints info about all servers that can be attacked (max-money) and an approximate metric for comparing revenue based on time it takes to weaken server.
