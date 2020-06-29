[![Airship LLC](./airship-logo.png)](https://teamairship.com/)

```
██████  ███████  █████   ██████ ████████                                                  
██   ██ ██      ██   ██ ██         ██                                                     
██████  █████   ███████ ██         ██                                                     
██   ██ ██      ██   ██ ██         ██                                                     
██   ██ ███████ ██   ██  ██████    ██                                                     
                                                                                          
                                                                                          
██████  ███████ ██    ██ ███████  █████  ██████  ██      ███████                          
██   ██ ██      ██    ██ ██      ██   ██ ██   ██ ██      ██                               
██████  █████   ██    ██ ███████ ███████ ██████  ██      █████                            
██   ██ ██      ██    ██      ██ ██   ██ ██   ██ ██      ██                               
██   ██ ███████  ██████  ███████ ██   ██ ██████  ███████ ███████                          
                                                                                          
                                                                                          
 ██████  ██████  ███    ███ ██████   ██████  ███    ██ ███████ ███    ██ ████████ ███████ 
██      ██    ██ ████  ████ ██   ██ ██    ██ ████   ██ ██      ████   ██    ██    ██      
██      ██    ██ ██ ████ ██ ██████  ██    ██ ██ ██  ██ █████   ██ ██  ██    ██    ███████ 
██      ██    ██ ██  ██  ██ ██      ██    ██ ██  ██ ██ ██      ██  ██ ██    ██         ██ 
 ██████  ██████  ██      ██ ██       ██████  ██   ████ ███████ ██   ████    ██    ███████ 
```

A collection of components, utils, and hooks for React web and React Native.

Brought to you by [Airship LLC](https://teamairship.com/).

- [Web-only components/hooks/utils](./web)
- [Mobile-only components/hooks/utils](./mobile)
- [Common components/hooks/utils](./common)

## Deployment

The web portion of this app is deployed to [Heroku](https://dashboard.heroku.com/apps/react-reusable-components). See the [live app here](https://react-reusable-components.herokuapp.com/).

The following instructions were followed in order to get Heroku to successfully build using a sub-directory:

- [Medium article - Deploy Git subdirectory to Heroku
](https://medium.com/@timanovsky/heroku-buildpack-to-support-deployment-from-subdirectory-e743c2c838dd)
- [Git repo for above buildpack](https://github.com/timanovsky/subdir-heroku-buildpack)
- [Create React App buildpack for Heroku](https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack)
