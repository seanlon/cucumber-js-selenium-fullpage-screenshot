
timestamp=`date --rfc-3339=seconds`
echo "Starting test at ${timestamp}"

targetApplication=$1
echo "Running ${targetApplication}"
commandToExec="./node_modules/.bin/cucumber-js features/your-app-name/**/*.feature -f json:reports/cucumber_report.json"
echo "Running ${commandToExec}"
eval $commandToExec
timestamp=`date --rfc-3339=seconds`
echo "ending test at ${timestamp}"