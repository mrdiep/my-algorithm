using System;
using System.Collections.Generic;
using System.Linq;

public class Friend
{
    public string Email { get; private set; }

    public ICollection<Friend> Friends { get; private set; }

    public Friend(string email)
    {
        this.Email = email;
        this.Friends = new List<Friend>();
    }

    public void AddFriendship(Friend friend)
    {
        this.Friends.Add(friend);
        friend.Friends.Add(this);
    }

    public bool CanBeConnected(Friend friend, string strategy = "BFS")
    {
        if (!friend.Friends.Any() || !Friends.Any()) return false;

        switch (strategy)
        {
            case "DFS":
                return DFS(friend);

            case "BFS":
                return BFS(friend);

            case "BiDirectional":
                return BiDirectionalSearch(friend);
        }

        throw new ArgumentOutOfRangeException(nameof(strategy));
    }

    public bool DFS(Friend friend)
    {
        Stack<Friend> stack = new Stack<Friend>(new[] { this });
        return Search(friend, stack.Pop, stack.Push, () => stack.Count() > 0);
    }

    public bool BFS(Friend friend)
    {
        Queue<Friend> queue = new Queue<Friend>(new[] { this });
        return Search(friend, queue.Dequeue, queue.Enqueue, () => queue.Count() > 0);
    }

    public bool Search(Friend friend, Func<Friend> GetNextFriend, Action<Friend> Push, Func<bool> HasItem)
    {
        var checkEmail = friend.Email;
        Console.WriteLine("New Search");
        var visited = new HashSet<Friend>();
        while (HasItem())
        {
            var checkfriend = GetNextFriend();
            Console.WriteLine("Node: " + checkfriend.Email);

            if (visited.Contains(checkfriend)) continue; //ignore the crazy loop, cause memory exception
            visited.Add(checkfriend);

            if (checkEmail == checkfriend.Email)
                return true;

            foreach (var f in checkfriend.Friends) Push(f);
        }

        return false;
    }

    public bool BiDirectionalSearch(Friend friend)
    {
        var queueStart = new Queue<Friend>(Friends);
        var visitedStart = new HashSet<Friend>(new[] { this });

        var queueEnd = new Queue<Friend>(friend.Friends);
        var visitedEnd = new HashSet<Friend>(new[] { friend });


        Console.WriteLine("Start Search");
        while (queueStart.Count > 0 && queueEnd.Count > 0)
        {
            var startFriend = queueStart.Dequeue();
            var endFriend = queueEnd.Dequeue();

            if (visitedStart.Intersect(visitedEnd).Count() > 0) //stop if both target is reached.
                return true;

            Console.WriteLine("Loop");
            foreach (var f in startFriend.Friends.Where(x => !visitedStart.Contains(x)))
            {
                visitedStart.Add(f);
                queueStart.Enqueue(f);
            }

            foreach (var f in endFriend.Friends.Where(x => !visitedEnd.Contains(x)))
            {
                visitedEnd.Add(f);
                queueEnd.Enqueue(f);
            }

        }

        return false;
    }

    public static void Main(string[] args)
    {

        Friend a = new Friend("A");
        Friend b = new Friend("B");
        Friend c = new Friend("C");
        Friend d = new Friend("D");
        Friend e = new Friend("E");

        a.AddFriendship(b);
        a.AddFriendship(c);

        b.AddFriendship(a);
        b.AddFriendship(c);

        c.AddFriendship(a);
        c.AddFriendship(b);

        a.AddFriendship(d);
        d.AddFriendship(e);

        Console.WriteLine(b.CanBeConnected(e, "BFS"));
        Console.WriteLine(b.CanBeConnected(e, "DFS"));
        Console.WriteLine(b.CanBeConnected(e, "BiDirectional"));
    }
}