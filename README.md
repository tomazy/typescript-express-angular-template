Development
===========

requirements
------------

* docker (tested with Docker version 17.03.1-ce, build c6d412e)
* node 6.x (tested with node v6.10.1)

working in tmux (optional)
--------------------------

You will need `ruby` installed in order to use it.

```bash
gem install tmuxinator && tmuxinator
```

local mongodb
-------------

```bash
./scripts/start-mongodb-dev.sh
```

e2e tests
---------

```bash
./scripts/dev-e2e.sh
```

Continues Integration/Delivery
==============================

requirements
------------

* docker (tested with version 17.03.1-ce, build c6d412e)
* docker-compose (tested with version 1.11.2, build dfed245)

The stack of the application is defined in the [docker-compose.yml](docker-compose.yml) file.

During the CI phase this stack should be tested with our e2e tests (see `./e2e`).
