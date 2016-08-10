node {

  stage 'Prepare'
  withEnv(["node=${nodeHome}"]) {
       sh "npm install --verbose"
       sh "bower install"
     }

  stage 'Build'

  sh "grunt build -f"

  stage 'Test'

  stage 'Deploy'

}
