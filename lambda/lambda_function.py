from response import respond
import es


def lambda_handler(event, context):
    res = es.get_from_es()
    return respond(None, res)
