from response import respond
import es


def lambda_handler(event, context):
    return respond(None, {'status': 'OK'})
