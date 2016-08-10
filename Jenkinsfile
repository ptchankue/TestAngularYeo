node {
stage 'check environment'
  sh "node -v"
  sh "npm -v"
  sh "bower -v"
  sh "grunt -v"

  stage 'Prepare'
  sh "npm install --verbose"
  sh "bower install"

  stage 'Build'

  sh "grunt build -f"

  stage 'Test'

  stage 'Deploy'

}
