package hb.humanbenchmarkserver.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.SubProtocolCapable;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * @author Raphael Paquin
 * @version 01
 * The server web socket handler. Used for extensive logging.
 * 2024-04-23
 * HumanBenchmarkServer
 */
@Slf4j
public class ServerWebSocketHandler extends TextWebSocketHandler implements SubProtocolCapable {

    private final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
    @Override
    @NonNull
    public List<String> getSubProtocols() {
        return Collections.singletonList("subprotocol.humanbenchmark.websocket");
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        log.info(session.getId() + " : new session ID.");
        TextMessage message = new TextMessage("one time text message from server.");
        session.sendMessage(message);

    }


    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        log.info("Session was removed : {}", session);
        log.info(status + "");

    }

}
