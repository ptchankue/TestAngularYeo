node {
  def nodeHome = tool 'Node'

  stage 'Prepare'
  withEnv(["node=${nodeHome}"]) {
       sh "npm install --verbose"
       sh "npm install -g bower"
       sh "bower install"
     }

  stage 'Build'

  sh "grunt build -f"

  stage 'Test'

  stage 'Deploy'

}
